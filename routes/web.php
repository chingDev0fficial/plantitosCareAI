<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AnalyzeController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::post('/analyze', [AnalyzeController::class, 'analyze']);


Route::get('/result', function () {
    return Inertia::render('result');
})->name('result');


/* Route::middleware(['auth', 'verified'])->group(function () { */
/*     Route::get('dashboard', function () { */
/*         return Inertia::render('dashboard'); */
/*     })->name('dashboard'); */
/* }); */

/* require __DIR__.'/settings.php'; */
/* require __DIR__.'/auth.php'; */
