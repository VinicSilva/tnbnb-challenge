<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    const INCOME = 'income';
    const EXPENSE = 'expense';

    protected $fillable = [
        'value',
        'user_id',
        'type',
        'check_id',
        'purchase_id',
    ];

    public function purchase() {
        return $this->hasOne(Purchase::class, 'id', 'purchase_id');
    }

    public function user() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function check() {
        return $this->hasOne(BackCheck::class,'id', 'check_id');
    }
}
