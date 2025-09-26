<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Exception\ProcessFailedException;
use GuzzleHttp\Client;

class AnalyzeController extends Controller
{
    public function analyze(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try
        {
            Log::info("Working");
            if (!$request->hasFile('image')) {
                return response()->json(['error' => 'No image uploaded'], 400);
            }

            $image = $request->file('image');

            $client = new Client(['base_uri' => 'http://127.0.0.1:5000']);

            // Call Python script
            $response = $client->request('POST', '/api/identify-disease', [
                'multipart' => [
                    [
                        'name'     => 'image',
                        'contents' => fopen($image->getRealPath(), 'r'),
                        'filename' => $image->getClientOriginalName(),
                    ],
                ],
            ]);

            $result = json_decode($response->getBody(), true);
            return response()->json([   'sucess' => true,
                                        'message' => 'Analysis service available',
                                        'result' => $result], 200);
        }
        catch ( \Exception $e )
        {
            return response()->json([   'success' => false,
                                        'message' => 'Analysis service unavailable'], 500);
        }

    }
}
