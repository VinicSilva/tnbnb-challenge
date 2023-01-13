<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankCheck extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'user_id',
        'description',
        'image',
        'status'
    ];

    public function user() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    const PENDING = 'pending';
    const REJECTED = 'rejected';
    const ACCEPTED = 'accepted';
}
