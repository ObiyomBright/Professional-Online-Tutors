<?php

header('Content-Type: application/json');

// Allow CORS
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $input = file_get_contents("php://input");
    $bundledText = json_decode($input, true);

    if (!$bundledText) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON input']);
        exit();
    }

// Prepare the WhatsApp API payload
$curl = curl_init();

$data = array(
    "phone_number" => "2347089830948",
    "device_id" => "202a79b9-7596-4004-9ad2-8bdc1204e1fa",
    "template_id" => "e9e5978e-11de-4075-85dd-d577ad1a49d4",
    "api_key" => "TLWHSBFtkmOaiKgMamhFlEYuRZQYeRYCRKqqQARpxDGRGyShNeaZbXkAPZCTIV",
    "data" => array(
        "bundledText" => $bundledText,
    )
);

curl_setopt_array(
    $curl,
    array(
        CURLOPT_URL => 'https://v3.api.termii.com/api/send/template',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
    )
);

$response = curl_exec($curl);

// Check for any errors in the cURL request
if (curl_errno($curl)) {
    $error_message = curl_error($curl);  // Capture cURL error message
    echo json_encode(['status' => 'error', 'message' => $error_message]); 
} else {
    // Successfully received a response, output it
    echo json_encode(['status' => 'success', 'message' => 'Session booked successfully. You\'ll be contacted shortly by one of our tutors']);
}

curl_close($curl);

}

?>