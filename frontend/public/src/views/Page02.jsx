import {useNavigate} from "react-router-dom";

function Page02() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/page01");
    }

    return (
        <div >
            <h1>Page02</h1>
            <button onClick={handleClick}>goto page 1 avec la fonction navigate()</button>
        </div>
    )
}

export default Page02
