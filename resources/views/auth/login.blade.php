<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Iniciar Sesión</title>
		<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
	</head>
	<body class="bg-gray-100">
		<div class="min-h-screen flex items-center justify-center">
			<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h1 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>

				@if($errors->any())
                    <div
                        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{{ $errors->first() }}
                    </div>
                @endif

				<form method="POST" action="{{ route('login') }}">
					@csrf

					<div class="mb-4">
						<label for="email" class="block text-gray-700 mb-2">Correo Electrónico</label>
						<input type="email" id="email" name="email" value="{{ old('email') }}" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required autofocus>
					</div>

					<div class="mb-4">
						<label for="password" class="block text-gray-700 mb-2">Contraseña</label>
						<input type="password" id="password" name="password" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
					</div>

					<div class="mb-4 flex items-center">
						<input type="checkbox" id="remember" name="remember" class="mr-2">
						<label for="remember" class="text-gray-700">Recordar sesión</label>
					</div>

					<div class="mb-4">
						<button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
							Iniciar Sesión
						</button>
					</div>
				</form>
			</div>
		</div>
	</body>
</html>
