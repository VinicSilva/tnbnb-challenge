<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Balance extends Model
{
    use HasFactory;

    protected $fillable = [
        'income_value',
        'expense_value',
        'user_id',
    ];
    
    protected $table = 'balances';

    public function user() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
