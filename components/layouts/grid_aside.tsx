export default function GridAside({ children }) {
    return (
        <div className="layout grid_aside pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            {children}
        </div>
    );
}
