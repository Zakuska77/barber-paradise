import { useNavigate } from "react-router-dom";

function Creation() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/Home");
    }

    function RetourLog() {
        navigate("/Login");
    }

    return (
        <>
            <div className="m-6">
                <form className="box mt-4 mb-4 has-background-grey-lighter">
                    <h1 className="title mt-2 mb-2">Creation compte</h1>
                    <div className="field">
                        <label className="label ">Name</label>
                        <div className="control">
                            <input className="input has-background-white-ter	" type="text" placeholder="Text input" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input className="input has-background-white-ter	" type="text" placeholder="Text input" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input has-background-white-ter" type="email" placeholder="Email input" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Num</label>
                        <div className="control">
                            <input className="input has-background-white-ter" type="text" placeholder="Numero de telephone" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Date de naissance</label>
                        <div className="control">
                            <input className="input has-background-white-ter" type="text" placeholder="Date de naissance" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input has-background-white-ter" type="text" placeholder="Password" />
                            <input className="input mt-4 has-background-white-ter" type="text" placeholder="Password verification" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Subject</label>
                        <div className="control">
                            <div className="select has-background-white-ter">
                                <select>
                                    <option>Genre</option>
                                    <option>Femme</option>
                                    <option>Homme</option>
                                    <option>Autre</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="file is-boxed">
                        <label class="file-label">
                            <input class="file-input" type="file" name="resume" />
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label"> Choose a file… </span>
                            </span>
                        </label>
                    </div>

                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" />
                                I agree to the <a href="#">terms and conditions</a>
                            </label>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button onClick={handleClick} className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            <button onClick={RetourLog} className="button is-link is-light">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Creation;
