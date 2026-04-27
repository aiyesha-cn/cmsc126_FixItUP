@include ('auth.headerLR')

<div>
    <h3>Login</h3>
    <form action="">
        <input type="text" name="email" placeholder="Email"> <br>
        <input type="text" name="password" placeholder="Password"> <br>
        <input type="checkbox" name="remember" id="remember" class="w-4 h-4">
        <label for="remember" class="text-sm text-slate-800">Remember me</label> <br>
        <button>Login</button><br>
    </form>
    <p>
        Don't have an account?
        <a href="{{route('register')}}" class="text-amber-500 hover:underline">
            Register
        </a>
    </p>
</div>  