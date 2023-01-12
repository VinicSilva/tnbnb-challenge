<?php

if (! function_exists('formatPriceToSaveInDb')) {
    function formatPriceToSaveInDb(string $price)
    {
        return $price * 100;
    }
}