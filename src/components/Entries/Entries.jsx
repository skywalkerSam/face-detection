export const Entries = ({ name, entries }) => {
    return (
        <div>
            <div className="white-80 f3 ">
                {`${name}, Your Current Entries are...`}
            </div>
            <div className="green f1">
                {`#${entries}`}
            </div>
        </div>
    )
} 