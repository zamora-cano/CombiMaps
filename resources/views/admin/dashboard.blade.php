@extends('admin.layouts.app') <!-- Hereda de app.blade.php -->
@section('title', 'Dashboard') <!-- Título de la página -->

@section('content')

<div class="container mx-auto px-4 py-8">
<h1 class="text-2xl font-bold mb-6">Panel de Usuario</h1>
    
    <div class="bg-white rounded-lg shadow p-6">
        <p>Bienvenido, {{ Auth::user()->first_name }}!</p>
        <p>Tu rol: {{ Auth::user()->role->name }}</p>
        
        <form method="POST" action="{{ route('logout') }}" class="mt-4">
            @csrf
            <button type="submit" class="text-red-600 hover:underline">Cerrar Sesión</button>
        </form>
    </div>
</div>

@endsection