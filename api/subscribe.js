// Função da Vercel: recebe o e-mail, coloca na lista do Brevo e devolve o link de download.
//
// Variáveis de ambiente (Vercel → Settings → Environment Variables):
//   BREVO_API_KEY   chave de API do Brevo (SMTP & API → API Keys)
//   BREVO_LIST_ID   número da lista onde os contatos entram (Contatos → Listas)
//
// Para liberar outro app grátis com e-mail, adicione-o em DOWNLOADS
// e marque `gated: true` no js/products.js.

const DOWNLOADS = {
  refcanvas: 'https://github.com/vnadoti/RefCanvas/releases/latest',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método não permitido.' });
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const email = String(body.email || '').trim().toLowerCase();
  const product = String(body.product || '');
  const consent = body.consent === true;

  // Campo invisível: só robôs preenchem. Finge sucesso para não dar pista.
  if (body.website) return res.status(200).json({ ok: true, downloadUrl: null });

  if (!DOWNLOADS[product]) return res.status(400).json({ ok: false, error: 'Produto inválido.' });
  if (!EMAIL_RE.test(email) || email.length > 254) return res.status(400).json({ ok: false, error: 'Confira o seu e-mail.' });
  if (!consent) return res.status(400).json({ ok: false, error: 'Marque a caixa de consentimento para continuar.' });

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!apiKey || !listId) {
    console.error('BREVO_API_KEY ou BREVO_LIST_ID não configurados');
    return res.status(500).json({ ok: false, error: 'Cadastro indisponível no momento. Tente de novo mais tarde.' });
  }

  try {
    const r = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ email, listIds: [listId], updateEnabled: true }),
    });
    // 201 = contato novo, 204 = já existia e foi atualizado
    if (r.status !== 201 && r.status !== 204) {
      const detail = await r.text().catch(() => '');
      console.error('Brevo respondeu', r.status, detail);
      return res.status(502).json({ ok: false, error: 'Não consegui registrar seu e-mail agora. Tente de novo.' });
    }
  } catch (err) {
    console.error('Falha ao chamar o Brevo', err);
    return res.status(502).json({ ok: false, error: 'Não consegui registrar seu e-mail agora. Tente de novo.' });
  }

  return res.status(200).json({ ok: true, downloadUrl: DOWNLOADS[product] });
};
