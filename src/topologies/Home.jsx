import React from 'react';
import Header from '../components/Header';
import '../css/Home.css';
import Topo1 from '../assets/images/topo-1.jpg';
import Topo2 from '../assets/images/topo-2.jpeg';
import { Link } from 'react-router-dom';

const topologyData = [
  { id: 1, image: Topo1 },
  { id: 2, image: Topo2 },
  { id: 3, image: Topo1 },
  { id: 4, image: Topo1 },
  { id: 5, image: Topo1 },
  { id: 6, image: Topo1 }
];

const Home = () => {
  return (
    <div>
      <Header title='Topology Networking' />
      <section className='home'>
        <div className='container'>
          <div className='home-inner'>
            {topologyData.map((topo) => (
              <Link to={`topology-${topo.id}`} key={topo.id} className='home-card'>
                <div className='card-img-wrapper'>
                  <img src={topo.image} alt={`Topo ${topo.id}`} />
                </div>
                <h4 className="home-card-title">Toplogy {topo.id}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
