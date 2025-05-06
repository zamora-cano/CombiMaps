<aside 
    class="bg-blue-600 text-white w-64 min-h-screen flex flex-col fixed md:relative z-10 transition-all duration-300 ease-in-out"
    :class="{
        'sidebar-hidden': !sidebarOpen,
        'sidebar-visible': sidebarOpen
    }"
    x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="sidebar-hidden"
    x-transition:enter-end="sidebar-visible"
    x-transition:leave="transition ease-in duration-300"
    x-transition:leave-start="sidebar-visible"
    x-transition:leave-end="sidebar-hidden"
>
    <!-- Logo y botón para contraer -->
    <div class="p-4 flex items-center justify-between border-b border-blue-500">
        <a href="{{ route('dashboard') }}" class="text-xl font-bold">CombiMap</a>
        <button @click="sidebarOpen = false" class="text-white hover:text-blue-200 md:block hidden">
            <i class="fas fa-chevron-left"></i>
        </button>
    </div>

    <!-- Menú principal -->
    <nav class="flex-1 overflow-y-auto">
        <ul class="space-y-2 p-2">
            @auth
                <li>
                    <a href="{{ route('dashboard') }}" class="flex items-center p-3 rounded hover:bg-blue-700 transition">
                        <i class="fas fa-tachometer-alt mr-3"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                
                <!-- Ejemplo de menú desplegable -->
                <li x-data="{ open: false }">
                    <button @click="open = !open" class="w-full flex items-center justify-between p-3 rounded hover:bg-blue-700 transition">
                        <div class="flex items-center">
                            <i class="fas fa-map mr-3"></i>
                            <span>Rutas</span>
                        </div>
                        <i class="fas fa-chevron-down text-xs transition-transform" :class="{ 'transform rotate-180': open }"></i>
                    </button>
                    <ul x-show="open" class="ml-8 mt-1 space-y-1">
                        <li>
                            <a href="#" class="block p-2 rounded hover:bg-blue-700 transition">Nueva Ruta</a>
                        </li>
                        <li>
                            <a href="#" class="block p-2 rounded hover:bg-blue-700 transition">Mis Rutas</a>
                        </li>
                    </ul>
                </li>
                
                <li>
                    <a href="#" class="flex items-center p-3 rounded hover:bg-blue-700 transition">
                        <i class="fas fa-users mr-3"></i>
                        <span>Usuarios</span>
                    </a>
                </li>
                
                <li>
                    <a href="#" class="flex items-center p-3 rounded hover:bg-blue-700 transition">
                        <i class="fas fa-cog mr-3"></i>
                        <span>Configuración</span>
                    </a>
                </li>
            @endauth
        </ul>
    </nav>

    <!-- Footer del sidebar -->
    <div class="p-4 border-t border-blue-500">
        @auth
            <form action="{{ route('logout') }}" method="POST">
                @csrf
                <button type="submit" class="flex items-center w-full p-2 rounded hover:bg-blue-700 transition">
                    <i class="fas fa-sign-out-alt mr-3"></i>
                    <span>Cerrar Sesión</span>
                </button>
            </form>
        @endauth
        
        @guest
            <div class="space-y-2">
                <a href="{{ route('login') }}" class="block p-2 rounded hover:bg-blue-700 transition">Iniciar Sesión</a>
                <a href="{{ route('register') }}" class="block p-2 rounded hover:bg-blue-700 transition">Registrarse</a>
            </div>
        @endguest
    </div>
</aside>