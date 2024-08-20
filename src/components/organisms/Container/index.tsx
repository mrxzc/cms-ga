import Menu from '@components/molecules/Menu'
import Navigation from '@components/molecules/Navigation'

export default function Container({ children }: { readonly children: React.ReactNode }) {
  return (
    <section className="bg-secondary h-screen w-screen fixed">
      <div className="flex flex-row h-screen">
        <Menu />
        <div className="flex-1">{children}</div>
      </div>
      <Navigation />
    </section>
  )
}
