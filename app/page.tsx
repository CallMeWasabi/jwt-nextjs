import Link from "next/link";

export default function Home() {
  const linkLabel = [
    {
      label: "Login",
      href: "/login"
    },
    {
      label: "Register",
      href: "/register"
    }
  ]

  return (
    <main className="flex flex-col gap-y-3 p-5">
      <div className="flex justify-center items-center h-[600px]">
        <div className="card lg:card-side bg-base-100 shadow-xl border">
          <div className="card-body">
            <h1 className="card-title">Jsonwebtoken-api-test</h1>
            <p className="text-sm text-neutral-600">Welcome to my website!</p>
            <ul className="menu bg-base-200 w-56 rounded-box">
              {linkLabel.map((label, key) => {
                return (
                  <li key={key}><Link href={label.href}>{label.label}</Link></li>
                )
              })}
            </ul>
          </div>
        </div>
      </div >
    </main>
  )
}
