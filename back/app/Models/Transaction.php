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
        'bank_check_id',
        'purchase_id',
    ];

    public function purchase() {
        return $this->hasOne(Purchase::class, 'id', 'purchase_id');
    }

    public function user() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function bank_check() {
        return $this->hasOne(BankCheck::class,'id', 'bank_check_id');
    }
}
