import AppInfo from '../assets/AppInfo.tsx'

function Footer() {

    const AInfo:any = {AppInfo}
    const footerInfo = AInfo['AppInfo']['footer']

    return (
    <footer className="footer bg-transparent text-slate-50 pb-2 ps-2 w-full">
        <div className='flex text-xs justify-start'>
            <a href={footerInfo['crlink']} className='opacity-70 hover:opacity-100 hover:underline duration-500'>{footerInfo['copyright']}</a>
        </div>
    </footer>
);}

export default Footer