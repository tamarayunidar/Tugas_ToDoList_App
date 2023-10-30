import React, { useState, useEffect } from 'react';
import edit from './edit.png';
import hapus from './trash.png';

function DaftarData() {
  const [input, setInput] = useState({
    inputDaftar: ""
  });

  const [data, setData] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [ceklisItem, setCeklisItem] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemValue, setEditingItemValue] = useState("");

  const olahInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }

  const daftarBaru = (input) => {
    const newItem = {
      id: nextId,
      input: input.inputDaftar
    };
    setNextId(nextId + 1);
    setData([...data, newItem]);
  }

  const tambah = (event) => {
    event.preventDefault();
    daftarBaru(input);

    console.log(input.inputDaftar);

    setInput({
      ...input,
      inputDaftar: ""
    });
  }

  const ceklisKotak = (id) => {
    setCeklisItem({
      ...ceklisItem,
      [id]: !ceklisItem[id]
    });
  }

  const tombolHapus = (id) => {
    const deletedItem = data.find((item) => item.id === id);
    if (deletedItem) {
      console.log("Data", deletedItem.input, "terhapus");
    }
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const mulaiMengedit = (id, value) => {
    setEditingItemId(id);
    setEditingItemValue(value);
  };

  const selesaiMengedit = (id) => {
    if (editingItemValue !== "") {
      const editedItem = data.find((item) => item.id === id);
      if (editedItem) {
        console.log("Data", editedItem.input, "diubah menjadi data", editingItemValue);
        editedItem.input = editingItemValue;
      }
      setEditingItemId(null);
      console.log(data);
    }
  };

  const filterData = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "SEMUA":
        setDisplayData(data);
        break;
      case "AKTIF":
        setDisplayData(data.filter(item => !ceklisItem[item.id]));
        break;
      case "SELESAI":
        setDisplayData(data.filter(item => ceklisItem[item.id]));
        break;
      default:
        setDisplayData(data);
    }
  }

  useEffect(() => {
    console.log(data);
    console.log(ceklisItem);
  }, [data, ceklisItem]);


  return (
    <>
        <div className="flex justify-center mb-14">
          <input
            className="input-daftar border border-solid border-gray-500 rounded py-0.5 px-2.5 w-56"
            type="text"
            name="inputDaftar"
            placeholder="masukan list baru"
            value={input.inputDaftar}
            onChange={olahInput}
          />
          <button className="tombol-tambah border border-solid border-gray-500 rounded py-0.5 px-5 ml-5" onClick={tambah}>Tambah</button>
        </div>
        <div className="flex mb-10">
          <button className="tombol-semua border border-solid border-gray-500 rounded-xl py-0.5 px-2.5 mx-1" onClick={() => filterData("SEMUA")}>SEMUA</button>
          <button className="tombol-aktif border border-solid border-gray-500 rounded-xl py-0.5 px-2.5 mx-2" onClick={() => filterData("AKTIF")}>AKTIF</button>
          <button className="tombol-selesai border border-solid border-gray-500 rounded-xl py-0.5 px-2.5 mx-2" onClick={() => filterData("SELESAI")}>SELESAI</button>
        </div>
        <div>
          {data.filter(item => !item.deleted).map((item) => (
            <div key={item.id} className={ceklisItem[item.id] ? "line-through" : ""}>
              <div className='mt-4 border border-solid border-gray-500 rounded px-5 py-2 flex items-center justify-between'>
                {editingItemId === item.id ? (
                  <input
                    className='scale-150'
                    type="text"
                    value={editingItemValue}
                    onChange={(event) => {
                      setEditingItemValue(event.target.value);
                    }}
                    onBlur={() => selesaiMengedit(item.id)}
                    autoFocus
                  />
                ) : (
                  <>
                    <div className="flex items-center">
                      <input
                        className='scale-150 mr-5'
                        type="checkbox"
                        onChange={() => ceklisKotak(item.id)}
                        checked={ceklisItem[item.id] || false}
                      />
                      {item.input}
                    </div>
                    <div>
                      <button className='tombolEdit' onClick={() => mulaiMengedit(item.id, item.input)}>
                        <img src={edit} alt='ikon-edit' className='ml-2 mr-4' />
                      </button>
                      <button className='tombolHapus' onClick={() => tombolHapus(item.id)}>
                        <img src={hapus} alt='ikon-hapus' />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
    </>
  );
}

export default DaftarData;
