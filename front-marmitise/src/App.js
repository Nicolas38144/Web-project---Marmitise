import './App.css';
import HomeView from './views/homeView/homeView.js'

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar className="Router" />
                <Routes>
                    <Route path="*" element={<h1>404: page not found</h1>} />
                    <Route path='/' exact element={<HomeView />} />
                    {/*
                    <Route path={"/Sessions/:id"} exact element={<InfoViewSession />} />
                    <Route path={"/Athletes/:id"} exact element={<InfoViewAthlete />} />
                    <Route path={"/Athletes/:id"} exact element={<InfoTab />} />
                    <Route path={"/Bilans/:id"} exact element={<InfoTab />} />
                    <Route path={'/Sessions'} exact element={<SessionView />} />
                    <Route path='/Sessions/Create' exact element={<SessionForm type="create"/>} />
                    <Route path='/Sessions/Update' exact element={<SessionForm />} />
                    <Route path='/Athletes' exact element={<AthleteView />} />
                    <Route path='/Athletes/Create' exact element={<FormAthlete type="create" />} />
                    <Route path='/Athletes/Update' exact element={<FormAthlete />} />
                    <Route path='/Bilans' exact element={<BilanView />} />
                    <Route path='/Bilans/Create' exact element={<BilanForm />} />
                    <Route path='/Equipes' exact element={<EquipeView />} />
                    <Route path='/Formulaires' exact element={<p> Formulaires</p>} />
                    <Route path='/References' exact element={<p> References</p>} />
                    <Route path='/Sports' exact element={<SportsView />} />
                    <Route path='/Fichiers' exact element={<p> Fichiers</p>} />
                    <Route path='/Postes' exact element={<PositionView />} />
                    <Route path='/Bande_son' exact element={<BandeSonAppView/>} />
                    <Route path='/Fatmax' exact element={<p> Fatmax</p>} />
                    <Route path='/Seuils' exact element={<p> Seuils</p>} />
                    */}
                </Routes>
            </Router> 
        </div>
    );
}

export default App;
