import { useEffect, useState } from "react"
import withAuth from "../../../HOC/withAuth"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { fetchLinks } from "../../../store/linkSlice"
import Loader from "../../shared/Loader/Loader"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { MOCK_LINKS } from "../../../constants/mock"

const LinksTable = () => {
  const columns = [
    {
      accessorKey: "short",
      header: "Short Link",
      cell: (props: any) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: "target",
      header: "Target Link",
      cell: (props: any) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: "counter",
      header: "Clicks",
      cell: (props: any) => <p>{props.getValue()}</p>
    },
  ]

  const table = useReactTable({
    data: MOCK_LINKS,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table>
      {table.getHeaderGroups().map(headerGroup => (
        <thead key={headerGroup.id}>
          {headerGroup.headers.map((header: any) => (
            <th key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </thead>
      ))}

      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <th key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const MainPage = withAuth(() => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.link)

  useEffect(() => {
    dispatch(fetchLinks())
  }, [])

  if (isLoading) return <Loader className="mt-32"/>

	return (
		<div>
			<h1>Main page</h1>
      <p>This is secured route and it can't be accessed without authorization... in theory...</p>
      <br />
      <LinksTable />
		</div>
	)
})

export default MainPage
