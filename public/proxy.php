<?php
/*
 * AJAX proxy for Library Directory API
 *
 * This proxy will pipe all status and caching headers from the API to the client.
 */

$config = require '../config.php';
$get = array('client' => $config['client']);

function get_command() {
    if (empty($_GET['q'])) {
        throw new Exception('No command specified');
    }

    return $_GET['q'];
}

function get_query($vars = array()) {
    $get = $_GET + $vars;
    unset($get['q']);
    return $get;
}

function get_query_string($vars = array()) {
    $qs = array();
    foreach (get_query($vars) as $key => $value) {
        $qs[] = sprintf('%s=%s', urlencode($key), urlencode($value));
    }
    return '?' . implode('&', $qs);
}

// header('Content-Type: application/json');

$url = rtrim($config['api'], '/') . get_command() . get_query_string($get);
$curl = curl_init();
$headers = array(
    'Accept: application/json',
    'User-Agent: ' . $config['user_agent'],
);

ob_start();

curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_HEADER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
// curl_setopt($curl, CURLINFO_HEADER_OUT, true);
curl_exec($curl);
curl_close($curl);

$raw = ob_get_clean();

list($headers, $body) = explode("\r\n\r\n", $raw);
$headers = explode("\r\n", $headers);

array_map('header', $headers);
print($body);

