<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'user_id',
        'description',
        'purchase_date',
    ];

    public function user() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
