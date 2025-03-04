import { redirect } from "next/navigation"
import { comments } from "../data"

export async function GET(_request: Request,
    {params }: {
    params: {
        id: string,
    }
}) {
    const index = comments.findIndex(comment => comment.id === parseInt(params.id));
    if (index === -1) redirect("/comments");
    return Response.json(comments[index]);
}

export async function PATCH(request: Request,
    { params }: {
        params:
        {id: string}
    }
) {
    const body = await request.json();
    const { text } = body;
    const index = comments.findIndex(comment => comment.id === parseInt(params.id));
    if (index === -1) return new Response("comment not found", { status: 404 });
    comments[index].text = text;

    return Response.json(comments[index]);

}

export async function DELETE(request: Request,
    {params}:{params : {id:string}}
) {
    const index = comments.findIndex(comment => {
        return comment.id === parseInt(params.id);
    });
    if (index === -1) {
    return new Response("comment not found", { status: 404 });
  }
    const deletedComment = comments[index];
    comments.splice(index, 1);
    return Response.json(deletedComment);

}