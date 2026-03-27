import React, { useContext, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { v4 as uuid } from 'uuid';

const Input = () => {

  const { socket, chatData } = useContext(GeneralContext);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const userId = localStorage.getItem('userId');

  // 🔥 Upload to Cloudinary via backend
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:6001/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };

  // 🚀 Send Message
  const handleSend = async () => {
    try {
      let fileUrl = "";

      if (file) {
        setUploading(true);
        fileUrl = await uploadFile(file);
      }

      let date = new Date();

      socket.emit('new-message', {
        chatId: chatData.chatId,
        id: uuid(),
        text: text,
        file: fileUrl,
        senderId: userId,
        date: date
      });

      // reset
      setText('');
      setFile(null);
      setUploading(false);

    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <div className='input'>
      <input
        type="text"
        placeholder='type something...'
        onChange={e => setText(e.target.value)}
        value={text}
      />

      <div className="send">
        <input
          type="file"
          style={{ display: 'none' }}
          id='file'
          onChange={e => setFile(e.target.files[0])}
        />

        <label htmlFor="file" style={{ display: 'flex' }}>
          <BiImageAdd />
          <p style={{ fontSize: '12px' }}>
            {uploading ? 'Uploading...' : ''}
          </p>
        </label>

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;