/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const img = css`
  border: 2px solid black;
  width: 35%;
  margin-bottom: 10px;
`;

export default function Input() {
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [select, setSelect] = useState('');
  const [url, setUrl] = useState(
    'https://api.memegen.link/images/atis/And then they said/we are going to find the missing }.png',
  );
  const [data, setData] = useState([]);

  // Getting the values from the input boxes
  const handleTopChange = (event) => setTop(event.currentTarget.value);
  const handleBottomChange = (event) => setBottom(event.currentTarget.value);
  const handleSelectChange = (event) => setSelect(event.currentTarget.value);

  // Eventhandler for previewing the meme
  const handleMemeClick = () => {
    setUrl(`https://api.memegen.link/images/${select}/${top}/${bottom}.png`);
  };

  // Fetching Template Array used for the dropdown menu

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.memegen.link/templates/');
        const json = await response.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  // Download functionality

  function forceDownload(blob, filename) {
    // Create an invisible anchor element
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.setAttribute('download', filename);
    document.body.appendChild(anchor);

    // Trigger the download by simulating click
    anchor.click();

    // Clean up
    window.URL.revokeObjectURL(anchor.href);
    document.body.removeChild(anchor);
  }

  function downloadResource(URL, filename) {
    // If no filename is set, use filename from URL
    if (!filename) filename = URL.match(/\/([^/#?]+)[^/]*$/)[1];

    fetch(URL, {
      headers: new Headers({
        Origin: window.location.origin,
      }),
      mode: 'cors',
    })
      .then((response) => response.blob())
      .then((blob) => forceDownload(blob, filename))
      .catch((e) => console.error(e));
  }

  return (
    <form>
      <div className="input-parent-container">
        <div className="input-child-container">
          <label htmlFor="topline">Enter top line</label>
          <input
            type="text"
            id="topline"
            placeholder="And then they said"
            onChange={handleTopChange}
            value={top}
          />
        </div>
        <div className="input-child-container">
          <label htmlFor="bottomline">Enter bottom line</label>
          <input
            type="text"
            id="bottomline"
            placeholder="we are going to find ..."
            onChange={handleBottomChange}
            value={bottom}
          />
        </div>
      </div>
      <label htmlFor="meme">Choose your meme</label>
      {/* Mapping through array and creating the dropdown menu for choosing meme template */}
      <select value={select} id="meme" onChange={handleSelectChange}>
        <option>Please select</option>
        {data.map((objects) => (
          <option value={objects.id} key={objects.id}>
            {objects.name}
          </option>
        ))}
      </select>
      <div className="button-container">
        <button className="pushable" type="button" onClick={handleMemeClick}>
          <span className="shadow" />
          <span className="edge" />
          <span className="front">Display meme</span>
        </button>
        <button
          className="pushable"
          onClick={() => {
            downloadResource(
              `https://api.memegen.link/images/${select}/${top}/${bottom}.png`,
            );
          }}
          type="button"
        >
          <span className="shadow" />
          <span className="edge" />
          <span className="front">Download</span>
        </button>
      </div>
      <img css={img} alt="Generated Meme" src={url} />
    </form>
  );
}
