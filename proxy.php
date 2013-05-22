<?php
/**
 * AJAX proxy for Library Directory API
 */

define('BASE_URL', 'http://api.kirjastot.fi/v2');

function get_command() {
    if (empty($_GET['q'])) {
        throw new Exception('No command specified');
    }

    return $_GET['q'];
}

function get_query() {
    $get = $_GET;
    $get['format'] = 'json';
    unset($get['q']);
    return $get;
}

function get_query_string() {
    $qs = array();
    foreach (get_query() as $key => $value) {
        $qs[] = sprintf('%s=%s', urlencode($key), urlencode($value));
    }
    return '?' . implode('&', $qs);
}

header('Content-Type: application/json');

$url = BASE_URL . get_command() . get_query_string();
$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, $url);
curl_exec($curl);
curl_close($curl);
