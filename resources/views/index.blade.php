@include('layouts.header')

<section id="hero" class="relative min-h-screen flex items-center bg-cover bg-center" 
         style="background-image: url('{{ asset('images/sunflower.png') }}')">
    
    <div class="absolute inset-0 bg-black/20 pointer-events-none"></div>
    
    <div class="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12">
        <div class="max-w-3xl">
            <h3 class="text-5xl md:text-7xl lg:text-8xl font-black text-slate-950 leading-tight">
                Report it.<br>
                Track it.
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Fix it.</span>
            </h3>
            
            <p class="mt-6 text-lg md:text-xl text-white font-medium max-w-xl">
                FixItUP is UP Mindanao's centralized platform for reporting and tracking campus facility issues.
            </p>

            <div class="mt-10">
                <a href="#" 
                   class="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-2xl shadow-amber-950/40 transition-all active:scale-95 inline-block text-center w-full sm:w-auto">
                    Get Started
                </a>
            </div>
        </div>
    </div>
</section>

<section id="about" class="w-full py-20 md:py-32 border-b border-slate-100"
        style="background-image: url('{{ asset('images/bg2.jpg') }}')">>
        
    <div class="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div class="space-y-8">
            <div class="space-y-4">
                <h3 class="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                    A campus built to serve you — <span class="text-amber-500">starting with fixing what's broken.</span>
                </h3>
                <div class="h-1.5 w-20 bg-amber-500 rounded-full"></div>
            </div>

            <p class="text-lg text-slate-600 leading-relaxed font-medium">
                FixItUP was created to solve a simple but persistent problem: broken campus facilities with no easy way to report them. 
                <span class="block mt-4">
                    No more waiting for end-of-semester surveys. No more informal complaints that go unnoticed. 
                    With FixItUP, anyone in the UP Mindanao community can submit a maintenance request in minutes and follow its progress until it's resolved.
                </span>
            </p>

            <div class="grid grid-cols-2 gap-6 pt-4">
                <div class="flex items-center gap-3">
                    <div class="shrink-0 w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 font-bold">✓</div>
                    <p class="text-sm font-bold text-slate-700 uppercase tracking-tight">Instant Submission</p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="shrink-0 w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 font-bold">✓</div>
                    <p class="text-sm font-bold text-slate-700 uppercase tracking-tight">Real-time Tracking</p>
                </div>
            </div>
        </div>

        <div class="relative">
            <div class="bg-slate-50 border border-slate-200 rounded-[3rem] p-10 shadow-inner overflow-hidden">
                <div class="space-y-6">
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl">⚙️</div>
                            <div>
                                <div class="h-3 w-24 bg-slate-200 rounded-full mb-2"></div>
                                <div class="h-2 w-16 bg-slate-100 rounded-full"></div>
                            </div>
                        </div>
                        <span class="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full">In Progress</span>
                    </div>

                    <div class="space-y-3 opacity-40">
                        <div class="h-4 w-full bg-slate-200 rounded-lg"></div>
                        <div class="h-4 w-5/6 bg-slate-200 rounded-lg"></div>
                    </div>
                </div>
            </div>

            <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-800 rounded-3xl shadow-xl shadow-amber-500/20 flex items-center justify-center text-amber-400 text-6xl font-black">
                UP
            </div>
        </div>

    </div>
</section>

<section id="features" class="w-full bg-[#001219] py-24">
    <div class="max-w-5xl mx-auto px-10 flex flex-col items-center">
        <div class="">
            <h3 class="text-xl md:text-6xl font-bold text-white">What FixItUP Can DO </h3> <br>
            <h3 class="text-amber-500 text-center md:text-2xl">Everything you need to keep the campus running!</h3?>
        </div>

        <br>

        <div class="relative w-full flex flex-col items-center">
            <div class="z-10 w-32 h-32 bg-[#001219] border-[10px] border-amber-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                <svg class="w-16 h-16 text-amber-500 animate-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                </svg>
            </div>
            <div class="hidden lg:block absolute top-[64px] w-full h-[2px] bg-slate-800"></div>
        </div>

        <br> <br>

<!-- Features na naka card -->

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- Card 1 -->
        <div class="bg-slate-200 border border-slate-400 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:bg-amber-300">
            <div class="flex items-center justify-center">
                <img src="images/A.png" class="w-12 h-12">
            </div>

            <br>

            <h3 class="text-xl font-bold text-slate-900 mb-2 text-center">
                Submit a Report
            </h3>

            <p class="text-slate-600 text-center">
                Choose a building, pick an issue category, describe the problem, and attach a photo. Done in under a minute.
            </p>
        </div>

        <!-- Card 2 -->
        <div class="bg-slate-200 border border-slate-400 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:bg-amber-300">
            <div class="flex items-center justify-center">
                <img src="images/B.png" class="w-12 h-12">
            </div>

            <br>

            <h3 class="text-xl font-bold text-slate-900 mb-2 text-center">
                Track Your Request
            </h3>

            <p class="text-slate-600 text-center">
                See live status updates — Pending, Work-in-Progress, or Fixed — right from your dashboard.
            </p>
        </div>

        <!-- Card 3 -->
        <div class="bg-slate-200 border border-slate-400 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:bg-amber-300">
            <div class="flex items-center justify-center">
                <img src="images/C.png" class="w-12 h-12">
            </div>

            <br>

            <h3 class="text-xl font-bold text-slate-900 mb-2 text-center">
                Centralized Records
            </h3>

            <p class="text-slate-600 text-center">
                Every report is logged and stored. Nothing gets lost, forgotten, or ignored.
            </p>
        </div>

        <!-- Card 4 -->
        <div class="bg-slate-200 border border-slate-400 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:bg-amber-300">
            <div class="flex items-center justify-center">
                <img src="images/D.png" class="w-12 h-12">
            </div>

            <br>

            <h3 class="text-xl font-bold text-slate-900 mb-2 text-center">
                Admin Management
            </h3>

            <p class="text-slate-600 text-center">
                Maintenance staff can view, filter, and update all requests from one organized panel.
            </p>
        </div>

        <!-- Card 5 -->
        <div class="bg-slate-200 border border-slate-400 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:bg-amber-300">
            <div class="flex items-center justify-center">
                <img src="images/E.png" class="w-12 h-12">
            </div>

            <br>

            <h3 class="text-xl font-bold text-slate-900 mb-2 text-center">
                Role-Based Access
            </h3>

            <p class="text-slate-600 text-center">
                Students, faculty, staff, and admins each get a view tailored to their needs.
            </p>
        </div>

        <!-- Card 6 -->
        <div class="bg-slate-200 border border-slate-400 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:bg-amber-300">
            <div class="flex items-center justify-center">
                <img src="images/F.png" class="w-12 h-12">
            </div>

            <br>

            <h3 class="text-xl font-bold text-slate-900 mb-2 text-center">
                Completion Logs
            </h3>

            <p class="text-slate-600 text-center">
                Finished repairs are documented with timestamps and personnel details for full accountability.
            </p>
        </div>

    </div>
</section>

@include('layouts.footer')