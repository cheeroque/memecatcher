import { Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'

import './tailwind.css'

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const getLinkClass = (isActive: boolean) =>
    `w-full rounded-lg px-5 py-4${isActive ? ' font-medium text-white bg-cyan-700' : ''}`

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <div className="flex h-screen">
          <div className="flex flex-col w-full max-w-[20rem] px-6 py-8 text-slate-800 bg-slate-100">
            <h1 className="text-[2rem] font-medium text-cyan-700 mb-8">MemeCatcher</h1>

            <ul className="flex flex-col items-stretch gap-2">
              <li className="flex">
                <NavLink className={({ isActive }) => getLinkClass(isActive)} to="/">
                  Stickers
                </NavLink>
              </li>

              <li className="flex">
                <NavLink className={({ isActive }) => getLinkClass(isActive)} to="/emotions">
                  Emotions
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="w-full">{children}</div>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
