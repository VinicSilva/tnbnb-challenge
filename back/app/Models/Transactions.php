<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
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

    protected $table = 'transactions';

    public function purchase() {
        return $this->hasOne(Purchases::class, 'id', 'purchase_id');
    }

    public function user() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function check() {
        return $this->hasOne(Checks::class,'id', 'check_id');
    }
}
