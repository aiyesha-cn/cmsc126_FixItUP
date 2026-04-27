@include ('auth.headerLR')

<div>
    <h3>Sign Up</h3> <br>
    <form method="POST" action="{{route('register')}}">
        @csrf
        <input type="text" name="user_first_name" placeholder="First Name"> <br>
        <input type="text" name="user_last_name" placeholder="Last Name"> <br>
        <select name="role" required>
            <option value=''>Select</option>
            <option value='Student'>Student</option>
            <option value='Faculty'>Faculty</option>
            <option value='Administration'>Administration</option>
            <option value='Staff'>Staff</option>
            <option value='Other'>Other</option>
        </select> <br>
        <input type="text" name="email" placeholder="Email"> <br>
        <input type="text" name="password" placeholder="Password"> <br>
        <button>Create Account</button> <br>
    </form>
        <p>
            Already have an account?
            <a href="{{ route('login') }}" class="text-amber-500 hover:underline">
                Login
            </a>
        </p>
</div>