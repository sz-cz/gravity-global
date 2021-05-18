<?php declare(strict_types = 1);

include_once 'vendor/autoload.php';

$content = [
    'title' => 'Welcome to your Frontend developer recruitment task!',
    'box' => [
        'title' => 'Lorem Ipsum',
        'content' => 'Lorem ipsum dolor sit amet, consectetur adipis scing elit. Pellentesque ac nisi felis. Suspendisse ut finibus augue.',
        'images_default' => [
            'large' => [
                'url' => 'assets/images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_1400.jpg',
                'width' => 1400,
                'height' => 931
            ],
            'medium' => [
                'url' => 'assets/images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_ar_16_9,c_fill,g_auto__c_scale,w_720.jpg',
                'width' => 720,
                'height' => 405
            ],
            'small' => [
                'url' => 'assets/images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_480.jpg',
                'width' => 480,
                'height' => 319
            ],
        ],
        'images' => array_map(function ($src) {
            list($width, $height) = getimagesize($src);
            return [
                'url' => $src,
                'width' => $width,
                'height' => $height
            ];
        }, glob("assets/images/*.jpg"))
    ]
];

$loader = new \Twig\Loader\FilesystemLoader('./views');
$twig = new \Twig\Environment($loader);

echo $twig->render('pages/index.html', $content);