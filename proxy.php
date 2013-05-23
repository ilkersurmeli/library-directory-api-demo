<?php
/*
 * AJAX proxy for Library Directory API
 *
 * This proxy will pipe all status and caching headers from the API to the client.
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

// header('Content-Type: application/json');

$url = BASE_URL . get_command() . get_query_string();
$curl = curl_init();

ob_start();

curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_HTTPHEADER, array('Accept: application/json'));
curl_setopt($curl, CURLOPT_HEADER, true);
// curl_setopt($curl, CURLINFO_HEADER_OUT, true);
curl_exec($curl);
curl_close($curl);

$raw = ob_get_clean();

list($headers, $body) = explode("\r\n\r\n", $raw);
$headers = explode("\r\n", $headers);

array_map('header', $headers);
print($body);
