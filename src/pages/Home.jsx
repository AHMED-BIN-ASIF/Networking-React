import React from 'react';
import Header from '../components/common/Header';
import '../css/Home.css';
import Topo1 from '../assets/images/topo1.png';
import Topo2 from '../assets/images/topo2.png';
import Topo3 from '../assets/images/topo3.png';
import { Link } from 'react-router-dom';
import { desc } from 'framer-motion/client';

const topologyData = [
  { id: 1, image: Topo1, name: 'Single VCN Architecture', description: 'One network with public and private subnets. Simple setup for basic applications with direct internet access.' },
  { id: 2, image: Topo2, name: 'Hub and Spoke VCN Architecture', description: 'Multiple networks connected through a central hub. Isolated environments with shared security services.' },
  { id: 3, image: Topo3, name: 'Hub and Spoke VCN with site-to-site VPN to on-premises Architecture', description: 'Segregated layers for web, application, and database. Enhanced security and performance for complex applications.' },
  // { id: 4, image: Topo1, name: 'Hybrid Cloud Architecture', description: 'Connect on-premises data centers with cloud VCNs. Secure and scalable extension of existing infrastructure.' },
  // { id: 5, image: Topo1, name: 'Complex VCN Architecture', description: 'Multiple VCNs with intricate routing and security. Designed for large-scale applications requiring high availability.' },
  // { id: 6, image: Topo1, name: 'Custom VCN Architecture', description: 'Tailored network designs to meet specific business needs. Flexible configurations for unique application requirements.' },
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
                  <img src={topo.image} alt={topo.name} />
                </div>
                {/* <h4 className="home-card-title">{topo.name}</h4> */}
                <div className="topo-card-body">
                  <p className='topo-detail-para'>
                    {topo.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
