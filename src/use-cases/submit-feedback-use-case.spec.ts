//Testar a funcao desaclopada
//se a funcao esta fazendo o que pra ser feito, sem testar
//
// descrever as funcionalidades /
//(it) e importante que os testes tenha linhguagem facil leitura/
//(it)isso deve(deveria fazer alguma coisa) - deveria ser possivel enviar o feedback/
import { SubmitFeedbackUseCase } from "../use-cases/submit-feedback-use-case";

//criando função falsa para responder ao teste
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMain: sendMailSpy }
);
//iniciando a suite de teste descrevendo a funcionalidade -- aqui eu posso ter varios testes dentro desta suite
describe("Submit feedback", () => {
  //(deveria ser possivel enviar um feedback)
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot:
          "data:image/png;base64,asm.djnfm,ncv,mnajklsdhfajsdnflmtest.jpg",
      })
    ).resolves.not.toThrow(); //espero um acerto, sem um disparo de erro

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  //espero que nao seja possivel mandar um feedback sem o TYPE
  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot:
          "data:image/png;base64,asm.djnfm,ncv,mnajklsdhfajsdnflmtest.jpg",
      })
    ).rejects.toThrow(); //esperando um erro de retorno
  });

  //espero que nao seja possivel mandar um feedback sem o COMENTARIO
  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot:
          "data:image/png;base64,asm.djnfm,ncv,mnajklsdhfajsdnflmtest.jpg",
      })
    ).rejects.toThrow(); //esperando um erro de retorno
  });

  //espero que nao seja possivel mandar um feedback om uma Screan invalida
  it("should not be able to submit a feedback with invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "ta tudo bugado",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow(); //esperando um erro de retorno
  });
});
