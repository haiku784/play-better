Route::group(['prefix' => 'api'], function () {
    Route::get('/resource', 'ResourceController@index');
    Route::post('/resource', 'ResourceController@store');
});