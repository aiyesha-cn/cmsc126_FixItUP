<!DOCTYPE html>
<html lang="en">
<head class="scroll-smooth">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FixItUP</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-transparent">
    <header class="sticky top-0 z-50 w-full bg-transparent">
        <nav class="flex items-center justify-between px-10 py-6">
            <a href="{{route('index')}}#hero" class="text-xl font-bold text-gray-800 shrink-0 w-24">
                FixItUP
            </a>

            <div class="flex items-center gap-10 text-sm font-medium text-gray-600">
                <a href="{{route('index')}}#about" class="hover:text-amber-600 transition-colors">About Us</a>
                <a href="{{route('index')}}#features" class="hover:text-amber-600 transition-colors">Features</a>
            </div>

            <div class="w-24"></div>
    </header>
</body>
</html>