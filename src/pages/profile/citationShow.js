import { useState } from 'react';
import Modal from 'react-modal';
import CitationList from './citationList';


const CitationSHow = (props) => {
    const {data, citationCount} = props;
    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '10px',
          padding: '30px',
          width: '600px',
        },
      };

    return  (
        <>      
        <div>Citation: {citationCount} {citationCount!==0? <p className="ml-2 inline text-blue-500 underline cursor-pointer" onClick={()=> setIsOpen(true)}>See the list</p> : ''}</div>

        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div>
                <div className='flex justify-end mt-[-10px] mb-2'><button type='submit'  className="btn btn-sm btn-info text-sm text-white capitalize hover:text-black" onClick={()=> setIsOpen(false)}>X</button></div>
                <p className='text-lg'> <p className='font-semibold inline'>Title:</p> {data.title}</p>
                <div className='my-4'>
                    {
                        data?.citations.map((d, index) => <CitationList key={index} index={index} data={d}/>)
                    }
                </div>
            </div>
        </Modal>
        </>
    )
}

export default CitationSHow;