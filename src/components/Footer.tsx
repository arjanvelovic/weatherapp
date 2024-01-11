import AppInfo from '../assets/AppInfo.tsx'

function Footer() {

    const AInfo:any = {AppInfo}
    const footerInfo = AInfo['AppInfo']['footer']

    return (
    <footer className="footer bg-gray-950 text-slate-300 grid grid-cols-3 py-1 p-0 w-full">
        <div className='flex text-xs items-center justify-center'>
            <a href={footerInfo['crlink']} className='opacity-70 hover:opacity-100 hover:underline duration-500'>{footerInfo['copyright']}</a>
        </div>
        <div className='flex text-xs items-center justify-center'>
        <a href='/'><img src={footerInfo['logo']} alt="FooterLogo" className='w-auto h-10 opacity-70 hover:opacity-100 transition duration-500'/></a>
        </div>

        <div className='flex items-center justify-center'>
            {footerInfo['links'].map((link:any) => (
                <a key={link['link']} href={link['link']} className='mx-3 hover:text-white transition duration-700'><i className={link['logo']}/></a>
            ))}
        </div>
    </footer>
);}

export default Footer