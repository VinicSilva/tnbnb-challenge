<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;

class UserRepositoryEloquent implements UserRepositoryInterface
{
	private $model;

	public function __construct(User $model)
	{
		$this->model = $model;
	} 

    public function store(array $user)
	{
		return $this->model->create($user);
	}   
}
