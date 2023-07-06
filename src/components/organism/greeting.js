import React from 'react';

const Greeting = () => {
  let date = new Date();
  let greeting, color;
  let hours = date.getHours();
  let usuario = 'Ederd Jair Cruzado Sifuentes'
  if(hours < 12) {
    greeting = `Buenos días ${usuario}, cada mañana es otra nueva oportunidad de vivir algo increíble. Te deseo que tu día esté lleno de momentos únicos.`;
    color = `#FFAC35`;
  } else if(hours >= 12 && hours <= 18) {
    greeting = `Buenas tardes ${usuario}, las tardes son la forma en que la vida te dice que estás más cerca de tus sueños.`;
    color = `#2EC0FF`;
  } else if(hours >= 18 && hours <= 24) {
    greeting = `Buenas noches ${usuario}, el amor no tiene cura, pero es la cura para todos los males.`;
    color = `#0F242D`;
  }
  
  return(
    <div className='animated fadeIn ml-3 mb-3' style={{ borderLeft: 'solid 5px', borderLeftColor: color}}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 style={{fontSize: '50px'}}>SanaBelleza</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='col-md-12'>
                <span>{greeting}</span>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}
export default Greeting