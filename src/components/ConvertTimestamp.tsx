import React, {useEffect, useState} from "react";

interface TimeStampResult {
  UnixTime: number;
  ISO8601: string;
  RFC2822: string;

  JP_JST: string;
  JP_UTC: string;
}

const ConvertToTimeStampResult = (date: Date): TimeStampResult => {
  const unixTime = Math.floor(date.getTime() / 1000);
  const iso8601 = date.toISOString();
  const rfc2822 = date.toUTCString();

  const ymd_jst = date.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  })

  const ymd_utc = date.toLocaleString("ja-JP", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  })
  return {
    UnixTime: unixTime,
    ISO8601: iso8601,
    RFC2822: rfc2822,
    JP_JST: ymd_jst,
    JP_UTC: ymd_utc,
  }
}

const ConvertTimeStamp = (timestampString: string): Date => {
  // check timestampString is unix timestamp format
  const isUnixTimestamp = /^\d{10}$/.test(timestampString);
  if (isUnixTimestamp) {
    return new Date(parseInt(timestampString) * 1000);
  }
  // check timestampString is ISO 8601 format
  const isISO8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(timestampString);
  if (isISO8601) {
    return new Date(timestampString);
  }
  return new Date(timestampString);
}

const ConvertTimeStampComponent = () => {
  const [timestampText, setTimestampText] = useState<string>("");
  const [convertedResult, setConvertedResult] = useState<TimeStampResult | null>(null);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    console.log("useEffect");
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log("request", request);
    })
  })

  const convertTimestamp = () => {
    try {
      const date = ConvertTimeStamp(timestampText);
      setConvertedResult(ConvertToTimeStampResult(date));
    } catch (e) {
      setError(`Error: ${e}`);
    }
  };

  return (
    <>
      <h3>Convert Timestamp</h3>
      <>
        <input type="text" value={timestampText} onChange={(event) => setTimestampText(event.target.value)}/>
        <button onClick={convertTimestamp}>convert</button>
      </>
      <>
        {convertedResult && (
          <>
            <table>
              <tbody>
              <tr>
                <td>UnixTime</td>
                <td>{convertedResult.UnixTime}</td>
              </tr>
              <tr>
                <td>ISO8601</td>
                <td>{convertedResult.ISO8601}</td>
              </tr>
              <tr>
                <td>RFC2822</td>
                <td>{convertedResult.RFC2822}</td>
              </tr>
              <tr>
                <td>YMD_JST</td>
                <td>{convertedResult.JP_JST}</td>
              </tr>
              <tr>
                <td>YMD_UTC</td>
                <td>{convertedResult.JP_UTC}</td>
              </tr>
              </tbody>
            </table>
          </>
        )}
        {error && <div>{error}</div>}
      </>
    </>
  );
};

export default ConvertTimeStampComponent;
