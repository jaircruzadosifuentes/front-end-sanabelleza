import * as React from 'react';
import { Label } from 'src/components/atoms';
import PropTypes from 'prop-types';
import CardPacketType from 'src/components/organism/card-packet-type';
import CardFrecuencyType from 'src/components/organism/card-frecuency-type';

const listPeriodo = [
  {
    id: 1,
    value: 'DIARIO (TODOS LOS DÍAS)'
  },
  {
    id: 2,
    value: '2 VECES POR SEMANA'
  },
  {
    id: 3,
    value: '3 VECES POR SEMANA'
  },

]

export default function FormDetailPacket({
  packetsOrUnitSession = [],
  handleClickItemPackets,
  idSelectPacket = 0,
  handleClickItemPeriodo,
  idFrecuencia = 0
}) {
  return (
    <div className='card mt-2 mb-2'>
      <div className='card-body'>
        <div className='row'>
          <Label title={'FRECUENCIA DE TRATAMIENTO'} isBold />
          {
            packetsOrUnitSession.map((p, index) => {
              return (
                <div className='col-md-6 mt-2 mb-4 text-center' key={index}>
                  <CardPacketType 
                    costPerUnit={p.costPerUnit}
                    idSelectPacket={parseInt(idSelectPacket)}
                    description={p.description}
                    abbreviation={p.abbreviation}
                    idPacket={parseInt(p.packetsOrUnitSessionsId)}
                    disabled
                  />
                  <br />
                  <div className='row'>
                    {
                      listPeriodo.map(l => {
                        return (
                          <div className='col-md-4 mt-2 text-center' key={l.id}>
                            <CardFrecuencyType 
                              idSelectPacket={parseInt(idSelectPacket)}
                              idPacket={parseInt(p.packetsOrUnitSessionsId)}
                              description={l.value}
                              idSelectFrecuency={parseInt(idFrecuencia)}
                              idFrecuency={parseInt(l.id)}
                              disabled
                            />
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
       
      </div>
    </div>
  );
}
FormDetailPacket.propTypes = {
  packetsOrUnitSession: PropTypes.array,
  handleClickItemPackets: PropTypes.func,
  handleClickItemPeriodo: PropTypes.func,
  idSelectPacket: PropTypes.number,
  idFrecuencia: PropTypes.number,
};