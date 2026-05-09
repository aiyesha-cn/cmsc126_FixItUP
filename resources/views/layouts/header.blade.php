<!DOCTYPE html>
<html lang="en">
<head class="scroll-smooth">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FixItUP</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        
        @keyframes rotate-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-slow { animation: rotate-slow 10s linear infinite; }
    </style>
</head>

<body class="bg-gray-50">
    <header class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-md">
        <nav class="flex items-center justify-between px-10 py-6">
            <a href="#hero" class="text-xl font-bold text-gray-800 shrink-0">
                FixItUP
            </a>

            <div class="flex items-center gap-10 text-sm font-medium text-gray-600">
                <a href="#about" class="hover:text-amber-600 transition-colors">About Us</a>
                <a href="#features" class="hover:text-amber-600 transition-colors">Features</a>
            </div>

            <div class="text-sm font-medium text-gray-800">
                @auth
                <form method="POST" action="{{ route('logout') }}" class="inline">
                    @csrf
                    <button type="submit" class="px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-amber-600 transition-all text-xs uppercase tracking-widest">
                        Log Out
                    </button>
                </form>
                @endauth

                @guest
                    <a href="{{ url('/login') }}" class="px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-amber-600 transition-all text-xs uppercase tracking-widest">Log In & Sign Up</a>
                @endguest
            </div>
        </nav>
    </header>
</body>
</html>