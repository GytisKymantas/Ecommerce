<?php
require './vendor/autoload.php';

header('Content-Type', 'application/json');

// /Stripe/Stripe::setApiKey("sk_test_51IXpoDCuIuoRhTfFoPWLIBJx5gM9tvkE8jJRgY8V8mojwf9KhT95alsMgglYFq1qRTjjCDt39M4uPNqa2UlNJqPP00sTY092vy");
// $session = Stripe\Checkout\Session::create([...]);

$stripe = new Stripe\StripeClient("sk_test_51IXpoDCuIuoRhTfFoPWLIBJx5gM9tvkE8jJRgY8V8mojwf9KhT95alsMgglYFq1qRTjjCDt39M4uPNqa2UlNJqPP00sTY092vy");
$session = $stripe->checkout->sessions->create([
    "success_url" => "http://localhost:8080/success.html",
    "cancel_url" => "http://localhost:8080/cancel.html",
    "payment_method_types" => ['card'],
    "mode" => 'payment',
    'allow_promotion_codes' => true,
    "line_items" => [
        [
            "price_data" => [
                "currency" =>"gbp",
                "product_data" => [
                    "name"=> '{prod_K9UeFolLON7Sp9}',
                    "description" => "{prod_K9UeFolLON7Sp9}"
                ],
                    "unit_amount" => 5000
            ],
            'adjustable_quantity' => [
                'enabled' => true,
                'minimum' => 1,
                'maximum' => 10,
              ],
            "quantity" => 1
        ],
       
    ]

]);

echo json_encode($session);

?>