import React from "react";
import { Label } from "src/components/atoms";
import { FileUploader } from "react-drag-drop-files";
import PropTypes from 'prop-types';

const fileTypes = ["JPG", "PNG", "GIF"];

export default function LoadDocs({
  handleChange,
  file = {},
  listDocs = []
}) {

  return (
    <>
      <div className="row mt-2">
        <Label title={'CARGA DE ARCHIVOS'} isBold isColor />
        <div className="col-md-12 mt-2">
          <FileUploader 
            name="file" 
            types={fileTypes} 
            handleChange={handleChange}
            multiple
          />
        </div>
        <div className="col-md-12 mt-2">
          {/* {
            listDocs.map((f, index) => {
              return(
                <p key={index}>{f.name}</p>
              )
            })
          } */}
          {
            // file?.map((f, index) => {
            //   return(
            //     <p key={index}>{file ? `Nombre del Archivo: ${f.name}` : "No ha cargado archivos"}</p>
            //   )
            // })
          }
        </div>

      </div>
    </>
  )
}
LoadDocs.propTypes = {
  handleChange: PropTypes.func,
  file: PropTypes.object,
  listDocs: PropTypes.array,
};