import './App.css';
import {Routes, Route} from 'react-router-dom'
import SelectClass from './screens/SelectClass/SelectClass'
import RegisterSupplier from './screens/RegisterSupplier/RegisterSupplier'
import LoginSupplier from "./screens/LoginSupplier/LoginSupplier";
import Supplier from './screens/Supplier/Supplier'
import AdministrationLogin from "./screens/AdministrationLogin/AdministrationLogin";
import Administration from "./screens/Administration/Administration";

function App() {
    return (
        <div className="App bg-custom-green h-screen w-screen">
            <Routes>
                <Route path={'/'} exact element={<SelectClass/>}/>
                <Route path={'supplier/register'} exact element={<RegisterSupplier/>}/>
                <Route path={'supplier/login'} exact element={<LoginSupplier/>}/>
                <Route path={'supplier'} exact element={<Supplier/>}/>
                <Route path={'administration/login'} exact element={<AdministrationLogin/>}/>
                <Route path={'administration'} exact element={<Administration/>}/>
            </Routes>
        </div>
    );
}

export default App;
