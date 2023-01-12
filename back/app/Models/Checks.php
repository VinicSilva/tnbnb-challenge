<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checks extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'user_id',
        'description',
        'image',
        'status'
    ];

    protected $table = 'checks';

    public function user() {
        return $this->hasOne(User::class, 'id');
    }

    const PENDING = 'pending';
    const REJECTED = 'rejected';
    const ACCEPTED = 'accepted';
}
