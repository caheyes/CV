document
  .getElementById('downloadButton')
  .addEventListener('click', function () {
    const { jsPDF } = window.jspdf;

    // Seleciona o conteúdo do container
    const container = document.querySelector('.container');

    // Configurações adicionais para o html2canvas
    const options = {
      scale: 1.5,
      useCORS: true, // Permite carregar imagens de outros domínios
      allowTaint: true, // Permite que imagens com CORS desativado sejam carregadas (use com cuidado)
      logging: true, // Ativa o log para verificar qualquer erro
    };

    // Converte o conteúdo do container em canvas
    html2canvas(container, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      while (heightLeft > 0) {
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position = heightLeft > 0 ? position + pageHeight : 0;
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

      pdf.save('CV-Caroline-Souza.pdf');
    });
  });
