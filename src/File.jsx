import { useEffect, useState } from "react";

const filesArray = [
  {
    fileName: "File one",
    href: "/file/file_one",
    isFolder: false,
    id: 1,
  },
  {
    fileName: "File two",
    href: "/file/file_two",
    isFolder: false,
    id: 2,
  },
  {
    fileName: "File three",
    href: "/file/file_three",
    isFolder: false,
    id: 3,
  },
];

function formatDate() {
  const today = new Date();
  // Month starts at 0, annoyingly
  const monthNum = today.getMonth() + 1;
  const dateNum = today.getDate();
  const yearNum = today.getFullYear();
  return monthNum + "/" + dateNum + "/" + yearNum;
}

function formatReadableDate(inputDate) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthStr = months[inputDate.getMonth()];
  const dateSuffixStr = dateSuffix(inputDate.getDate());
  const yearNum = inputDate.getFullYear();
  return monthStr + " " + dateSuffixStr + "," + yearNum;
}
const FileDate = ({ inputDate }) => {
  const [dateStr, setDateStr] = useState(formatDate(inputDate));
  const [labelText, setLabelText] = useState(formatReadableDate(inputDate));

  useEffect(() => {
    setTimeout(() => {
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const tomorrowDate = formatDate(tomorrow);
      setDateStr(tomorrowDate);
    }, 5000);
  });
  return <span aria-label={labelText}>{dateStr}</span>;
};

function dateSuffix(dayNumber) {
  const lastDigit = dayNumber % 10;
  if (lastDigit == 1 && dayNumber != 11) {
    return dayNumber + "st";
  }
  if (lastDigit == 2 && dayNumber != 12) {
    return dayNumber + "nd";
  }
  if (lastDigit == 3 && dayNumber != 13) {
    return dayNumber + "rd";
  }
  return dayNumber + "th";
}

const File = ({ fileName, isSelected, onSelected, isFolder }) => {
  return (
    <button
      onClick={onSelected}
      style={
        isSelected
          ? { backgroundColor: "blue", color: "white" }
          : { backgroundColor: "white", color: "blue" }
      }
    >
      {fileName}
      {isFolder ? <span>Type: Folder</span> : <span>Type: File</span>}
      {isFolder && <FileDate inputDate={new Date()} />}
    </button>
  );
};
const FileList = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const onSelected = (idx) => {
    if (selectedIndex === idx) {
      setSelectedIndex(-1);
      return;
    }
    setSelectedIndex(idx);
  };

  const [onlyShowFiles, setOnlyShowFiles] = useState(false);
  const toggleOnlyShow = () => setOnlyShowFiles(!onlyShowFiles);

  return (
    <div>
      <button onClick={toggleOnlyShow}>Only show files</button>
      <ul>
        {filesArray.map((file, i) => (
          <li key={file.id}>
            {(!onlyShowFiles || !file.isFolder) && (
              <File
                isSelected={selectedIndex === i}
                onSelected={() => onSelected(i)}
                fileName={file.fileName}
                href={file.href}
                isFolder={file.isFolder}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
